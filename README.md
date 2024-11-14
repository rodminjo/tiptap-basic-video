# rodminjo/tiptap-basic-video


[![NPM Version](https://img.shields.io/npm/v/tiptap-basic-video)](https://www.npmjs.com/package/tiptap-basic-video)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/rodminjo/tiptap-basic-video)](https://github.com/rodminjo/tiptap-basic-video)
[![License](https://img.shields.io/github/license/rodminjo/tiptap-basic-video)](https://github.com/rodminjo/tiptap-basic-video)

## Introduction

[Tiptap](https://tiptap.dev/) is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.

My implementation extends Tiptap by adding a basic video tag feature. Using [this library](https://github.com/rodminjo/tiptap-basic-video), users can easily insert video tags into the rich text editor. It provides options for adjusting the width, height, controls, and autoplay settings for the video.


## Installation

Install the package:

```shell
npm i tiptap-basic-video
```

## Usage
Settings:

```js
import {Video} from "tiptap-basic-video";

const editor = useEditor({
  extensions: [Video]
});

```

Example Usage:

```js
editor.commands.setVideo({
  src: videoUrl,
  width: "auto",
  height: "auto",
  autoplay: false,
  controls: true
})
```

Options:

```js
import {Video} from "tiptap-basic-video";

const editor = useEditor({
  extensions: [
    Video.configure({
      HTMLAttributes: {
        // Additional HTML attributes to add to the video tag (e.g., class, id, etc.)
        class: "my-video",  // Example: adding a class attribute
      },
      inline: false, // Whether the video should be treated as an inline element (default: false) [type : boolean]
      height: "auto", // Set the height of the video (default: auto, can be specified in px) [type : number | "auto"]
      width: "auto",  // Set the width of the video (default: auto, can be specified in px) [type : number | "auto"]
      autoplay: false, // Whether the video should autoplay (default: false) [type : boolean]
      controls: true, // Whether to display video controls (default: true) [type : boolean]
    }),
  ]
});

```