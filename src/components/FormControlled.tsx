"use client"

import { Schema } from "@src/app/basic/page";
import * as React from "react";
import { useForm, useController, UseControllerProps, Control } from "react-hook-form";

function Input({ name, control }: { name: string, control: Control<any>}) {
  const { field: { onChange } } = useController({ 
    name, 
    control, 
    defaultValue: "" 
});

  return (
    <div>
      <div className="cursor-pointer text-green-600" onClick={() => onChange("Valor 1")}>Valor 1</div>
      <div className="cursor-pointer text-green-600" onClick={() => onChange("Valor 2")}>Valor 2</div>
      <div className="cursor-pointer text-green-600" onClick={() => onChange("Valor 3")}>Valor 3</div>
    </div>
  );
}

export default Input