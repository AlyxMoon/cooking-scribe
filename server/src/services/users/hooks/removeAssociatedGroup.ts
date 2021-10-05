import { HookContext } from '@feathersjs/feathers'

const removeAssociatedGroup = () => async (
  context: HookContext,
): Promise<HookContext> => {
  await context.app.service('groups')
    .remove(context.result.idGroup)

  return context
}

export default removeAssociatedGroup
