(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_cf6ce3._.js", {

"[project]/src/components/Layout/SplitScreen.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>SplitScreen)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function SplitScreen({ sidebar, content }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-80 border-r",
                children: sidebar
            }, void 0, false, {
                fileName: "[project]/src/components/Layout/SplitScreen.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: content
            }, void 0, false, {
                fileName: "[project]/src/components/Layout/SplitScreen.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Layout/SplitScreen.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = SplitScreen;
var _c;
__turbopack_refresh__.register(_c, "SplitScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/openai.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "VoiceService": (()=>VoiceService),
    "createAssistant": (()=>createAssistant),
    "generateSpeech": (()=>generateSpeech),
    "processMessage": (()=>processMessage),
    "updateAssistant": (()=>updateAssistant)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/openai/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
    apiKey: ("TURBOPACK compile-time value", "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"),
    dangerouslyAllowBrowser: true
});
async function createAssistant(config) {
    try {
        const assistant = await openai.beta.assistants.create({
            name: config.name,
            instructions: config.instructions,
            tools: config.tools || [],
            model: config.model || "gpt-4o",
            temperature: config.temperature,
            top_p: config.top_p
        });
        return assistant;
    } catch (error) {
        console.error('Error creating assistant:', error);
        throw error;
    }
}
async function updateAssistant(assistantId, config) {
    try {
        const assistant = await openai.beta.assistants.update(assistantId, {
            name: config.name,
            instructions: config.instructions,
            tools: config.tools || [],
            model: config.model,
            temperature: config.temperature,
            top_p: config.top_p
        });
        return assistant;
    } catch (error) {
        console.error('Error updating assistant:', error);
        throw error;
    }
}
async function processMessage(assistantId, content) {
    try {
        const thread = await openai.beta.threads.create();
        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: content
        });
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId
        });
        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while(runStatus.status !== 'completed'){
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
            if (runStatus.status === 'failed') {
                throw new Error('Run failed');
            }
        }
        const messages = await openai.beta.threads.messages.list(thread.id);
        const lastMessage = messages.data.filter((msg)=>msg.role === 'assistant').pop();
        if (!lastMessage?.content[0]) return 'No response';
        const content_block = lastMessage.content[0];
        if (content_block.type === 'text') {
            return content_block.text.value;
        }
        return 'Unsupported response type';
    } catch (error) {
        console.error('Error processing message:', error);
        throw error;
    }
}
async function generateSpeech(text) {
    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: text
        });
        const blob = new Blob([
            await mp3.arrayBuffer()
        ], {
            type: 'audio/mpeg'
        });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error generating speech:', error);
        throw error;
    }
}
class VoiceService {
    static instance;
    openai;
    audioContext = null;
    audioQueue = [];
    isPlaying = false;
    constructor(){
        this.openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
            apiKey: ("TURBOPACK compile-time value", "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"),
            dangerouslyAllowBrowser: true
        });
        if ("TURBOPACK compile-time truthy", 1) {
            this.audioContext = new AudioContext();
        }
    }
    static getInstance() {
        if (!VoiceService.instance) {
            VoiceService.instance = new VoiceService();
        }
        return VoiceService.instance;
    }
    async textToSpeech(text, voice = 'alloy') {
        try {
            const response = await this.openai.audio.speech.create({
                model: "tts-1",
                voice,
                input: text
            });
            const arrayBuffer = await response.arrayBuffer();
            if (this.audioContext) {
                const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
                const source = this.audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(this.audioContext.destination);
                source.start(0);
            }
        } catch (error) {
            console.error('Error in text-to-speech:', error);
            throw error;
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Assistant/AssistantCreator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>AssistantCreator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$openai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/openai.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
function AssistantCreator({ onClose, onCreated }) {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        instructions: '',
        model: 'gpt-4',
        temperature: 0.7,
        tools: [
            {
                type: 'code_interpreter'
            }
        ]
    });
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const assistant = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$openai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAssistant"])(formData);
            onCreated(assistant);
        } catch (error) {
            console.error('Error creating assistant:', error);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white p-6 rounded-lg w-96",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-bold mb-4",
                    children: "Create New Assistant"
                }, void 0, false, {
                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block mb-2",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: formData.name,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            name: e.target.value
                                        }),
                                    className: "w-full border rounded p-2",
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block mb-2",
                                    children: "Instructions"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: formData.instructions,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            instructions: e.target.value
                                        }),
                                    className: "w-full border rounded p-2",
                                    rows: 4,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block mb-2",
                                    children: "Temperature"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "0",
                                    max: "1",
                                    step: "0.1",
                                    value: formData.temperature,
                                    onChange: (e)=>setFormData({
                                            ...formData,
                                            temperature: parseFloat(e.target.value)
                                        }),
                                    className: "w-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formData.temperature
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onClose,
                                    className: "px-4 py-2 border rounded",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "px-4 py-2 bg-blue-500 text-white rounded",
                                    children: "Create"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Assistant/AssistantCreator.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(AssistantCreator, "3fgWijPzsQSgmCB23fAqGEa5P+0=");
_c = AssistantCreator;
var _c;
__turbopack_refresh__.register(_c, "AssistantCreator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Assistant/AssistantSettings.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>AssistantSettings)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$openai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/openai.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/openai/index.mjs [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
    apiKey: ("TURBOPACK compile-time value", "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"),
    dangerouslyAllowBrowser: true // Note: In production, you should use API routes
});
function AssistantSettings({ assistant, onUpdate }) {
    _s();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(assistant);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$openai$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAssistant"])(assistant.id, formData);
            onUpdate(updated);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating assistant:', error);
        }
    };
    if (!isEditing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 border rounded",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-bold mb-2",
                    children: assistant.name
                }, void 0, false, {
                    fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm mb-4",
                    children: assistant.instructions
                }, void 0, false, {
                    fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsEditing(true),
                    className: "text-blue-500",
                    children: "Edit Settings"
                }, void 0, false, {
                    fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "p-4 border rounded",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2",
                        children: "Name"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: formData.name,
                        onChange: (e)=>setFormData({
                                ...formData,
                                name: e.target.value
                            }),
                        className: "w-full border rounded p-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2",
                        children: "Instructions"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: formData.instructions,
                        onChange: (e)=>setFormData({
                                ...formData,
                                instructions: e.target.value
                            }),
                        className: "w-full border rounded p-2",
                        rows: 4
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block mb-2",
                        children: "Temperature"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: "0",
                        max: "1",
                        step: "0.1",
                        value: formData.temperature || 0.7,
                        onChange: (e)=>setFormData({
                                ...formData,
                                temperature: parseFloat(e.target.value)
                            }),
                        className: "w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: formData.temperature
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setIsEditing(false),
                        className: "px-4 py-2 border rounded",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "px-4 py-2 bg-blue-500 text-white rounded",
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Assistant/AssistantSettings.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(AssistantSettings, "C2diCLx2Tl0KrlGBU1Td7s2Yvw4=");
_c = AssistantSettings;
var _c;
__turbopack_refresh__.register(_c, "AssistantSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Layout/Sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Assistant$2f$AssistantCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Assistant/AssistantCreator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Assistant$2f$AssistantSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Assistant/AssistantSettings.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
function Sidebar({ activeAssistant, onAssistantChange }) {
    _s();
    const [isCreating, setIsCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsCreating(true),
                className: "w-full bg-blue-500 text-white rounded-md py-2 mb-4",
                children: "Create New Assistant"
            }, void 0, false, {
                fileName: "[project]/src/components/Layout/Sidebar.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            isCreating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Assistant$2f$AssistantCreator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setIsCreating(false),
                onCreated: (assistant)=>{
                    onAssistantChange(assistant);
                    setIsCreating(false);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Layout/Sidebar.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this),
            activeAssistant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Assistant$2f$AssistantSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                assistant: activeAssistant,
                onUpdate: onAssistantChange
            }, void 0, false, {
                fileName: "[project]/src/components/Layout/Sidebar.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Layout/Sidebar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "aodhKfF0+mgCWIpo7M6ELxBdlsg=");
_c = Sidebar;
var _c;
__turbopack_refresh__.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Chat/ChatInterface.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "OpenAIConnectionTest": (()=>OpenAIConnectionTest),
    "default": (()=>ChatInterface)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/openai/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
;
;
function OpenAIConnectionTest() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('testing');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OpenAIConnectionTest.useEffect": ()=>{
            const testConnection = {
                "OpenAIConnectionTest.useEffect.testConnection": async ()=>{
                    try {
                        const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]({
                            apiKey: ("TURBOPACK compile-time value", "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"),
                            dangerouslyAllowBrowser: true
                        });
                        await openai.models.list();
                        setStatus('success');
                    } catch (err) {
                        setStatus('error');
                        setError(err instanceof Error ? err.message : 'Unknown error');
                    }
                }
            }["OpenAIConnectionTest.useEffect.testConnection"];
            testConnection();
        }
    }["OpenAIConnectionTest.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 p-2 rounded-lg text-sm",
        children: [
            status === 'testing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-yellow-500",
                children: "Testing OpenAI connection..."
            }, void 0, false, {
                fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this),
            status === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-green-500",
                children: "OpenAI connection successful!"
            }, void 0, false, {
                fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-red-500",
                children: [
                    "OpenAI connection failed: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Chat/ChatInterface.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(OpenAIConnectionTest, "KT9b1PLm0yzvYn0U/ldjbBd+FJo=");
_c = OpenAIConnectionTest;
function ChatInterface({ assistant, sessionToken }) {
    _s1();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const webSocketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            // Initialize WebRTC connection
            const pc = new RTCPeerConnection();
            // Set up audio element for model responses
            const audioEl = document.createElement("audio");
            audioEl.autoplay = true;
            pc.ontrack = ({
                "ChatInterface.useEffect": (e)=>audioEl.srcObject = e.streams[0]
            })["ChatInterface.useEffect"];
            audioRef.current = audioEl;
            // Add local audio track for microphone input
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then({
                "ChatInterface.useEffect": (stream)=>{
                    pc.addTrack(stream.getTracks()[0]);
                }
            }["ChatInterface.useEffect"]);
            // Create data channel for events
            const dc = pc.createDataChannel("oai-events");
            // Handle incoming messages
            dc.addEventListener("message", {
                "ChatInterface.useEffect": (e)=>{
                    const event = JSON.parse(e.data);
                    handleServerEvent(event);
                }
            }["ChatInterface.useEffect"]);
            // Connect to OpenAI's Realtime API
            initializeConnection(pc, sessionToken);
            return ({
                "ChatInterface.useEffect": ()=>{
                    pc.close();
                    if (audioRef.current) {
                        audioRef.current.srcObject = null;
                    }
                }
            })["ChatInterface.useEffect"];
        }
    }["ChatInterface.useEffect"], [
        sessionToken
    ]);
    const handleServerEvent = (event)=>{
        switch(event.type){
            case "response.text.delta":
                // Handle incremental text updates
                setMessages((prev)=>{
                    const newMessages = [
                        ...prev
                    ];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                        lastMessage.content += event.delta;
                    } else {
                        newMessages.push({
                            role: 'assistant',
                            content: event.delta
                        });
                    }
                    return newMessages;
                });
                break;
        }
    };
    const sendMessage = (text)=>{
        if (!webSocketRef.current) return;
        // Create conversation item
        const event = {
            type: "conversation.item.create",
            item: {
                type: "message",
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: text
                    }
                ]
            }
        };
        webSocketRef.current.send(JSON.stringify(event));
        // Request response from model
        const responseEvent = {
            type: "response.create",
            response: {
                modalities: [
                    "text",
                    "audio"
                ]
            }
        };
        webSocketRef.current.send(JSON.stringify(responseEvent));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "realtime-chat",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "messages",
                children: messages.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `message ${msg.role}`,
                        children: msg.content
                    }, i, false, {
                        fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "input-area",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Type your message...",
                    onKeyPress: (e)=>{
                        if (e.key === 'Enter') {
                            sendMessage(e.currentTarget.value);
                            e.currentTarget.value = '';
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Chat/ChatInterface.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Chat/ChatInterface.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s1(ChatInterface, "B2pObLPwUSfm1YshaSW+g/QMqP4=");
_c1 = ChatInterface;
async function initializeConnection(pc, token) {
    // Create and set local description
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // Get answer from OpenAI
    const baseUrl = "https://api.openai.com/v1/realtime";
    const model = "gpt-4o-realtime-preview-2024-12-17";
    const response = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/sdp"
        }
    });
    const answer = {
        type: 'answer',
        sdp: await response.text()
    };
    await pc.setRemoteDescription(answer);
}
var _c, _c1;
__turbopack_refresh__.register(_c, "OpenAIConnectionTest");
__turbopack_refresh__.register(_c1, "ChatInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$SplitScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layout/SplitScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chat$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Chat/ChatInterface.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
function Home() {
    _s();
    const [activeAssistant, setActiveAssistant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sessionToken, setSessionToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chat$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OpenAIConnectionTest"], {}, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$SplitScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                sidebar: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    activeAssistant: activeAssistant,
                    onAssistantChange: setActiveAssistant
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 18,
                    columnNumber: 11
                }, void 0),
                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Chat$2f$ChatInterface$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    assistant: activeAssistant,
                    sessionToken: sessionToken
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(Home, "ciFdjobgBD4ukyBrrYl0cX0mcag=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_cf6ce3._.js.map