import { Modules, Contracts } from '@youwol/vsf-core'

export const configuration = {
    schema: {
        vDom: Modules.jsCodeAttribute({
            value: (message) => {
                return {
                    tag: 'pre' as const,
                    innerText: JSON.stringify(message, null, 4),
                }
            },
        }),
    },
}

export const inputs = {
    input$: {
        description: 'the input stream',
        contract: Contracts.ofUnknown,
    },
}

export const outputs = (
    arg: Modules.OutputMapperArg<typeof configuration.schema, typeof inputs>,
) => ({
    output$: arg.inputs.input$,
})

export function module(fwdParams) {
    return new Modules.Implementation(
        {
            configuration,
            inputs,
            outputs,
            canvas: (instance) => {
                return {
                    tag: 'div',
                    children: [
                        {
                            source$:
                                instance.inputSlots.input$.preparedMessage$,
                            vdomMap: (message: Modules.ProcessingMessage) => {
                                return message.configuration['vDom'](message)
                            },
                        },
                    ],
                }
            },
        },
        fwdParams,
    )
}
