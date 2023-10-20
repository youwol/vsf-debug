import { Modules, Contracts } from '@youwol/vsf-core'
import { child$ } from '@youwol/flux-view'

export const configuration = {
    schema: {
        vDom: Modules.jsCodeAttribute({
            value: (message) => {
                return {
                    tag: 'pre',
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
                    children: [
                        child$(
                            instance.inputSlots.input$.preparedMessage$,
                            (message) => {
                                return message.configuration['vDom'](message)
                            },
                        ),
                    ],
                }
            },
        },
        fwdParams,
    )
}
