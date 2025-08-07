import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const formVariants = cva(
  "space-y-6"
)

const formGroupVariants = cva(
  "space-y-2"
)

const formLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const formInputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const formErrorVariants = cva(
  "text-sm font-medium text-destructive"
)

function Form({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(formVariants({ className }))}
      {...props}
    />
  )
}

function FormGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(formGroupVariants({ className }))}
      {...props}
    />
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(formLabelVariants({ className }))}
      {...props}
    />
  )
}

function FormInput({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof formInputVariants>) {
  return (
    <input
      type={type}
      className={cn(formInputVariants({ variant, className }))}
      {...props}
    />
  )
}

function FormError({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(formErrorVariants({ className }))}
      {...props}
    />
  )
}

export {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
  formVariants,
  formGroupVariants,
  formLabelVariants,
  formInputVariants,
  formErrorVariants,
}
