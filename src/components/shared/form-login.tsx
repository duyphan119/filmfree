"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const ButtonSubmit = () => {
  const { pending, data, method, action } = useFormStatus();
  console.log({ pending, data, method, action });
  return (
    <Button type="submit" className="w-full">
      {pending && <Loader2 className="animate-spin w-4 h-4" />} Đăng nhập
    </Button>
  );
};

const FormLogin = () => {
  return (
    <form
      action={login}
      className="w-full m-3 md:w-1/2 md:m-8 p-12 shadown-md bg-slate-500 text-slate-50 space-y-4 rounded-md"
    >
      <div className="">
        <h1 className="text-4xl font-bold uppercase">Đăng nhập</h1>
        <p className="text-slate-300">Đăng nhập để vào trang dành cho admin</p>
      </div>
      <div className="">
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          id="username"
          defaultValue="admin"
          className="text-slate-500"
        />
      </div>
      <div className="">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          defaultValue="admin"
          className="text-slate-500"
        />
      </div>
      <ButtonSubmit />
    </form>
  );
};

export default FormLogin;
