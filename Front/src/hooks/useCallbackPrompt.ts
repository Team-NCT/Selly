/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Transition } from "history";
import { useBlocker } from ".";

export default function useCallbackPrompt(when: boolean): [boolean, () => void, () => void] {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<Transition>();
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: Transition) => {
      // in if condition we are checking next location and current location are equals or not
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation]
  );

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location.pathname);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
