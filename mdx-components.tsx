/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MDXComponents } from "mdx/types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "@/components/CopyToClipboard";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    code: (props: any) => {
      const { children, ...restProps } = props;
      const [, language] =
        props.className !== undefined && props.className.length > 0
          ? props.className.match(/language-(\w+)/)
          : [];
      const codeText = String(children).replace(/\n$/, "");

      if (language !== undefined) {
        return (
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={dracula}
              showLineNumbers={true}
            >
              {codeText}
            </SyntaxHighlighter>
            <CopyToClipboard text={codeText} />
          </div>
        );
      }

      // return <Code fontSize="md" wordBreak="break-all" {...props} />;
      return (
        <span className="text-md w-fit rounded-sm bg-[#1c1c1c]  px-2 py-1 font-mono">
          {codeText}
        </span>
      );
    },
    h1: (props: any) => <h1 className="h1">{props.children}</h1>,
    h2: (props: any) => <h2 className="h2">{props.children}</h2>,
    h3: (props: any) => <h3 className="h3">{props.children}</h3>,
    h4: (props: any) => <h4 className="h4">{props.children}</h4>,
    p: (props: any) => <p className="mdx-p text-xl">{props.children}</p>,
    a: (props: any) => (
      <a className="mdx-a" target="_blank" {...props}>
        {props.children}
      </a>
    ),
    ul: (props: any) => (
      <ul className="mdx-ul text-xl" {...props}>
        {props.children}
      </ul>
    ),
    ol: (props: any) => (
      <ol className="mdx-ol text-xl" {...props}>
        {props.children}
      </ol>
    ),
    img: (props: any) => (
      <Image
        width={1000}
        height={100}
        className="mdx-img m-0 h-auto w-full object-cover"
        alt=""
        {...props}
      />
    ),
  };
}
