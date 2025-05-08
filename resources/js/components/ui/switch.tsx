import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    return (
        <SwitchPrimitive.Root
            className={cn(
                "relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-300 outline-none focus:shadow-black data-[state=checked]:bg-black",
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
        </SwitchPrimitive.Root>
    )
}

export { Switch }
