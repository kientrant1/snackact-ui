import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react'
import { Indicator, Item, Root } from '@radix-ui/react-radio-group'

import { cn } from '@/lib/css'

const RadioGroup = forwardRef<
  ComponentRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={cn('grid gap-2', className)} {...props} ref={ref} />
})
RadioGroup.displayName = Root.displayName

const RadioGroupItem = forwardRef<
  ComponentRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
      </Indicator>
    </Item>
  )
})
RadioGroupItem.displayName = Item.displayName

export { RadioGroup, RadioGroupItem }
