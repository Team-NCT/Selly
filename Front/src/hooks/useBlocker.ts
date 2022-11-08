// import { BrowserHistory, Blocker } from 'history';
// import { useContext, useEffect, useCallback } from 'react';
// import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
// import { createBrowserHistory } from 'history';

// export function useBlocker(blocker: Blocker, when = true) {
//   const navigation = useContext(NavigationContext).navigator as BrowserHistory;
//   const history = createBrowserHistory();

//   useEffect(() => {
//     if (!when) return;

//     const unblock = navigation.block(tx => {
//       // history.block
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };
//       blocker(autoUnblockingTx);
//     });
//     return unblock;
//   }, [navigator, blocker, when]);
// }

// export function usePrompt(message: string, when = true) {
//   const blocker = useCallback(
//     tx => {
//       //   eslint-disable-next-line no-alert
//       if (window.confirm(message)) tx.retry();
//     },
//     [message],
//   );

//   useBlocker(blocker, when);
// }
