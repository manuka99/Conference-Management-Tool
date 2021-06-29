import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useParams } from "react-router-dom";
import { APP_BASE_URL } from "../../../common/AppConstants";

export default function Index() {
  const { name } = useParams();
  const uri = APP_BASE_URL + "" + "/api/public/files/" + name;

  return (
    <>
      {name && (
        <>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[
              {
                uri,
              },
            ]}
          />
        </>
      )}
    </>
  );
}
