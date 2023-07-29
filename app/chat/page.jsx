"use client";
import { useEffect, useState, useCallback } from "react";
import DailyIframe from "@daily-co/daily-js";
import { DailyProvider } from "@daily-co/daily-react";

import createRoom from "../createRoom";
import { roomUrlFromPageUrl, pageUrlFromRoomUrl } from "../../lib/utils";

import HomeScreen from "../../components/chat/homeScreen/HomeScreen";
import Call from "../../components/chat/call/Call";
import Header from "../../components/chat/header/Header";
import Tray from "../../components/chat/tray/Tray";
import SettingsCheck from "../../components/chat/settingsCheck/SettingsCheck";

/* We decide what UI to show to users based on the state of the app, which is dependent on the state of the call object. */
const state = {
  idle: "STATE_IDLE",
  settingsCheck: "STATE_SETTINGS_CHECK",
  creating: "STATE_CREATING",
  joining: "STATE_JOINING",
  joined: "STATE_JOINED",
  leaving: "STATE_LEAVING",
  error: "STATE_ERROR",
};

export default function Home() {
  const [appState, setAppState] = useState(state.idle);
  const [roomUrl, setRoomUrl] = useState(null);
  const [callObject, setCallObject] = useState(null);
  const [apiError, setApiError] = useState(false);

  /**
   * Create a new call room. This function will return the newly created room URL.
   * We'll need this URL when pre-authorizing (https://docs.daily.co/reference/rn-daily-js/instance-methods/pre-auth)
   * or joining (https://docs.daily.co/reference/rn-daily-js/instance-methods/join) a call.
   */
  const createCall = useCallback(() => {
    setAppState(state.creating);
    return createRoom()
      .then((room) => room.url)
      .catch((error) => {
        console.error("Error creating room", error);
        setRoomUrl(null);
        setAppState(state.idle);
        setApiError(true);
      });
  }, []);

  /**
   * We've created a room, so let's start the settings check. We won't be joining the call yet.
   */
  const startSettingsCheck = useCallback(async () => {
    const newCallObject = DailyIframe.createCallObject();
    setCallObject(newCallObject);
    setAppState(state.settings_check);
    await newCallObject.startCamera();
  }, []);

  /**
   * Once we pass the settings check, we can actually join the call.
   */
  const joinCall = useCallback(() => {
    callObject.join({ url: roomUrl });
  }, [callObject, roomUrl]);

  /**
   * Start leaving the current call.
   */
  const startLeavingCall = useCallback(() => {
    if (!callObject) return;
    // If we're in the error state, we've already "left", so just clean up
    if (appState === state.error) {
      callObject.destroy().then(() => {
        setRoomUrl(null);
        setCallObject(null);
        setAppState(state.idle);
      });
    } else {
      /* This will trigger a `left-meeting` event, which in turn will trigger
      the full clean-up as seen in handleNewMeetingState() below. */
      setAppState(state.leaving);
      callObject.leave();
    }
  }, [callObject, appState]);

  /**
   * If a room's already specified in the page's URL when the component mounts,
   * join the room.
   */
  useEffect(() => {
    const url = roomUrlFromPageUrl();
    if (url) {
      startSettingsCheck(url);
    }
  }, [startSettingsCheck]);

  /**
   * Update the page's URL to reflect the active call when roomUrl changes.
   */
  useEffect(() => {
    const pageUrl = pageUrlFromRoomUrl(roomUrl);
    if (pageUrl === window.location.href) return;
    window.history.replaceState(null, null, pageUrl);
  }, [roomUrl]);

  /**
   * Update app state based on reported meeting state changes.
   *
   * NOTE: Here we're showing how to completely clean up a call with destroy().
   * This isn't strictly necessary between join()s, but is good practice when
   * you know you'll be done with the call object for a while, and you're no
   * longer listening to its events.
   */
  useEffect(() => {
    if (!callObject) return;

    const events = ["joined-meeting", "left-meeting", "error", "camera-error"];

    function handleNewMeetingState() {
      switch (callObject.meetingState()) {
        case "joined-meeting":
          setAppState(state.joined);
          break;
        case "left-meeting":
          callObject.destroy().then(() => {
            setRoomUrl(null);
            setCallObject(null);
            setAppState(state.idle);
          });
          break;
        case "error":
          setAppState(state.error);
          break;
        default:
          break;
      }
    }

    // Use initial state
    handleNewMeetingState();

    /*
     * Listen for changes in state.
     * We can't use the useDailyEvent hook (https://docs.daily.co/reference/daily-react/use-daily-event) for this
     * because right now, we're not inside a <DailyProvider/> (https://docs.daily.co/reference/daily-react/daily-provider)
     * context yet. We can't access the call object via daily-react just yet, but we will later in Call.js and SettingsCheck.js!
     */
    events.forEach((event) => callObject.on(event, handleNewMeetingState));

    // Stop listening for changes in state
    return () => {
      events.forEach((event) => callObject.off(event, handleNewMeetingState));
    };
  }, [callObject]);

  /**
   * Show the call UI if we're either joining, already joined, or have encountered
   * an error that is _not_ a room API error.
   */
  const showCall =
    !apiError && [state.joining, state.joined, state.error].includes(appState);

  /* When there's no problems creating the room and startSettingsCheck() has been successfully called,
   * we can show the settings check UI. */
  const showSettingsCheck = !apiError && appState === state.settings_check;

  const renderApp = () => {
    // If something goes wrong with creating the room.
    if (apiError) {
      console.error(apiError);
      // return (
      //   <div className="api-error">
      //     <h1>Error</h1>
      //     <p>
      //       Room could not be created. Check if your `.env` file is set up
      //       correctly. For more information, see the{" "}
      //       <a href="https://github.com/daily-demos/custom-video-daily-react-hooks#readme">
      //         readme
      //       </a>{" "}
      //       :)
      //     </p>
      //   </div>
      // );
    }

    // No API errors? Let's check our settings then.
    if (showSettingsCheck) {
      return (
        <DailyProvider callObject={callObject}>
          <SettingsCheck joinCall={joinCall} cancelCall={startLeavingCall} />
        </DailyProvider>
      );
    }

    // No API errors, we passed the settings check, and we've joined the call? Then show the call.
    if (showCall) {
      return (
        <DailyProvider callObject={callObject}>
          <Call />
          <Tray leaveCall={startLeavingCall} />
        </DailyProvider>
      );
    }

    // The default view is the HomeScreen, from where we start the demo.
    return (
      <HomeScreen
        createCall={createCall}
        startSettingsCheck={startSettingsCheck}
      />
    );
  };

  return (
    <div className="app">
      <Header />
      {renderApp()}
    </div>
  );
}
