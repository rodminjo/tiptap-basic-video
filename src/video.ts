import {mergeAttributes, Node} from '@tiptap/core'

export interface ConfigureVideoOptions {

    /**
     * The HTML attributes for a video node.
     * @default {}
     * @example { class: 'foo' }
     */
    HTMLAttributes: Record<string, any>;

    /**
     * Controls if the video node should be inline or not.
     * @default false
     * @example true
     */
    inline: boolean;

    /**
     * The height of the video.
     * @default "auto"
     * @example 720
     */
    height: number | "auto";

    /**
     * The width of the video.
     * @default "auto"
     * @example 1280
     */
    width: number | "auto";

    /**
     * Autoplay or not
     * @default false
     * @example true
     */
    autoplay: boolean;

    /**
     * adds a video control bar.
     * @default true
     * @example false
     */
    controls: boolean;
}


type SetVideoOptions = {
    src: string,
    width?: number | "auto",
    height?: number | "auto",
    autoplay?: boolean,
    controls?: boolean,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        video: {
            /**
             * Add video
             * @param options The video attributes
             * @example
             * editor
             *   .commands
             *   .setVideo({ src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', width: "auto", height: "auto" })
             */
            setVideo: (options: SetVideoOptions) => ReturnType,
        }
    }
}


export const VIDEO_FILE_REGEX = /\.(mp4|mov|webm|mkv)$/i;

export const isValidVideoUrl = (url: string) => {
    return VIDEO_FILE_REGEX.test(url);
}

/**
 * This extension allows you to insert images.
 * @see https://www.tiptap.dev/api/nodes/image
 */
export const Video = Node.create<ConfigureVideoOptions>({
    name: 'video',

    addOptions() {
        return {
            HTMLAttributes: {},
            inline: false,
            height: "auto",
            width: "auto",
            autoplay: false,
            controls: true,
        }
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: this.options.width,
            },
            height: {
                default: this.options.height,
            },
            autoplay: {
                default: this.options.autoplay,
            },
            controls: {
                default: this.options.controls,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'video[src]:not([src^="data:"])'
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        let style = {};
        if (HTMLAttributes.width === "auto"){
            style = {...style, width: '100%'}
        }

        if (HTMLAttributes.height === "auto"){
            style = {...style, height: '100%'}
        }

        if (!HTMLAttributes.autoplay){
            delete HTMLAttributes['autoplay']
        }

        if (!HTMLAttributes.controls){
            delete HTMLAttributes['controls']
        }

        return [
            'div',
            {'data-video': ''},
            ['video',
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                    name: this.name,
                    ...style,
                }),
            ]
        ];
    },

    addCommands() {
        return {
            setVideo: (options: SetVideoOptions) => ({commands}) => {
                if (!isValidVideoUrl(options.src)) {
                    return false
                }

                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },

})
