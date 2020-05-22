import React from "react";

// a custom hook for setting the page title
export function useDocumentTitle(title) {
  React.useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
