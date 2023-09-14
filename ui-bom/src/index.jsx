import React from "react";
import ReactDOM from "react-dom/client";
import parse from "html-react-parser";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const parser = (html) =>
    parse(html, {
        replace: (domNode) => {
            console.log(domNode.name);
            if (domNode.name === "view") {
                const { include } = domNode.attribs;
                return <IncludeView path={include} />;
            }
        },
    });

const useBackendComponent = (path) => {
    const {
        isLoading,
        error,
        data: render,
    } = useQuery({
        queryKey: [path],
        queryFn: () =>
            fetch(path)
                .then((res) => res.text())
                .then((html) => parser(html)),
    });
    return { isLoading, error, render };
};

function IncludeView({ path }) {
    const { isLoading, error, render } = useBackendComponent(path);
    return (
        <>
            {isLoading && "Loading..."}
            {error && JSON.stringify(error)}
            {!isLoading && !error && render}
        </>
    );
}

export const bootstrap = (html, rootElNode) => {
    const parsedTree = parser(html);

    const root = ReactDOM.createRoot(rootElNode);
    root.render(
        <QueryClientProvider client={queryClient}>
            <React.StrictMode>{parsedTree}</React.StrictMode>
        </QueryClientProvider>
    );
};
