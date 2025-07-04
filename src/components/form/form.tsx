import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, ZodTypeDef } from "zod";
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { Box, BoxProps } from "@mui/material";

interface FormProps<TFormValues, ZSchema>
  extends Omit<BoxProps, "children" | "onSubmit" | "component"> {
  children: (methods: UseFormReturn<any>) => React.ReactNode;
  onSubmit: SubmitHandler<any>;
  options?: Omit<UseFormProps<any>, "resolver">;
  schema?: ZSchema | any;
}

export function Form<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  ZSchema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>(props: FormProps<TFormValues, ZSchema>) {
  const { schema, options, onSubmit, children, ...restProps } = props;
  const methods = useForm({
    ...options,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <Box
      component="form"
      onSubmit={methods.handleSubmit(onSubmit, (formError) =>
        console.log(formError)
      )}
      {...restProps}
    >
      {children(methods)}
    </Box>
  );
}
