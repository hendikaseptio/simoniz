import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ListButton } from '../../tiptap-ui/list-button'
import { BlockQuoteButton } from '../../tiptap-ui/blockquote-button'
import { UndoRedoButton } from '../../tiptap-ui/undo-redo-button'
import { ToolbarGroup } from '../../tiptap-ui-primitive/toolbar'
import { MarkButton } from '../../tiptap-ui/mark-button'
import { LinkPopover } from '../../tiptap-ui/link-popover'
import { HeadingDropdownMenu } from '../../tiptap-ui/heading-dropdown-menu'
import Link from '@tiptap/extension-link'
import InputError from '../../input-error'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: true },
    }),
    Link.configure({ openOnClick: false }),
]
const InputTiptap = ({ name, label, value = '', onChange, errors = {} }) => {
    const error = errors[name]
    const [touched, setTouched] = useState(false)
    const [wasInvalid, setWasInvalid] = useState(false)

    useEffect(() => {
        if (error) setWasInvalid(true)
    }, [error])

    const editor = useEditor({
        content: value,
        extensions,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setTouched(true)
            onChange?.({ target: { name, value: html } }) // Simulasi event input
        },
        editorProps: {
            attributes: {
                class:
                    'prose max-w-none min-h-[120px] p-3 focus:outline-none ' +
                    (error
                        ? 'border-red-500 focus:ring-red-300'
                        : wasInvalid && touched
                            ? 'border-green-500 focus:ring-green-300'
                            : 'border-gray-300 focus:ring-blue-300'),
            },
        },
    })

    const isValid = wasInvalid && !error && touched

    return (
        <div className="grid w-full space-y-2">
            {label && (
                <Label htmlFor={name}>{label}</Label>
            )}

            {/* Wrapper with border */}
            <div
                aria-invalid={!!error}
                className={cn(
                    "placeholder:text-muted-foreground dark:bg-input border-input min-h-[100] w-full rounded-md border bg-input text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                )}
                // className={`rounded-md border ${error
                //     ? 'border-red-500 focus-within:ring-red-300'
                //     : isValid
                //         ? 'border-green-500 focus-within:ring-green-300'
                //         : 'border-gray-300 focus-within:ring-blue-300'
                //     } focus-within:ring-2 focus-within:outline-none`}
            >
                {editor && (
                    <div className="flex flex-wrap gap-2 p-2 border-b rounded-t-md bg-input dark:bg-input">
                        <ToolbarGroup>
                            <UndoRedoButton editor={editor} action="undo" />
                            <UndoRedoButton editor={editor} action="redo" />
                        </ToolbarGroup>
                        <HeadingDropdownMenu editor={editor} levels={[1, 2, 3, 4]} />
                        <ToolbarGroup>
                            <MarkButton editor={editor} type="bold" />
                            <MarkButton editor={editor} type="italic" />
                            <MarkButton editor={editor} type="strike" />
                            <MarkButton editor={editor} type="code" />
                            <MarkButton editor={editor} type="underline" />
                            <LinkPopover editor={editor} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ListButton editor={editor} type="bulletList" />
                            <ListButton editor={editor} type="orderedList" />
                            <ListButton editor={editor} type="taskList" />
                        </ToolbarGroup>
                        <BlockQuoteButton editor={editor} />
                    </div>
                )}
                <EditorContent editor={editor} />
            </div>

            {error && <InputError message={error} />}
            {isValid && <p className="text-sm text-green-500">Looks good!</p>}
        </div>
    )
}
export default InputTiptap