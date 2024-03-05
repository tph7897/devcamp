"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SchemaCheck = z.object({
  username: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }).max(100, { message: "이름은 100글자 이하이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
  phone: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine((value) => /^010\d{8}$/.test(value), "010으로 시작하는 11자리 숫자를 입력해주세요"),
  role: z.string().min(2, { message: "역할을 선택해주세요." }),
  password: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
  confirmPassword: z
    .string()
    .min(6, "비밀번호는 최소 6자리 이상이어야 합니다.")
    .max(100, "비밀번호는 100자리 이하이어야 합니다.")
    .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다."),
});

export default function Home() {
  const [step, setStep] = useState<number>(0);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof SchemaCheck>>({
    resolver: zodResolver(SchemaCheck),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof SchemaCheck>) {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast({
        title: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }
    alert(JSON.stringify(values, null, 4));
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between p-52">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
              <motion.div className={cn("space-y-3")} animate={{ translateX: `${step * -100}%` }} transition={{ ease: "easeInOut" }}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@sparta-devcamp.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="01000000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">관리자</SelectItem>
                          <SelectItem value="user">일반사용자</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn("space-y-3 absolute top-0 left-0 right-0")}
                animate={{ translateX: `${(1 - step) * 100}%` }}
                transition={{
                  ease: "easeInOut",
                }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type={"password"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input type={"password"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <Button
                type="button"
                className={cn({ hidden: step === 1 })}
                onClick={() => {
                  form.trigger(["phone", "email", "username", "role"]);
                  const phoneState = form.getFieldState("phone");
                  const emailState = form.getFieldState("email");
                  const usernameState = form.getFieldState("username");
                  const roleState = form.getFieldState("role");
                  if (!phoneState.isDirty || phoneState.invalid) return;
                  if (!emailState.isDirty || emailState.invalid) return;
                  if (!usernameState.isDirty || usernameState.invalid) return;
                  if (!roleState.isDirty || roleState.invalid) return;

                  setStep(1);
                }}
              >
                다음 단계로 ⭢
              </Button>
              <Button className={cn({ hidden: step === 0 })}>계정 등록하기</Button>
              <Button
                type="button"
                variant={"ghost"}
                className={cn({ hidden: step === 0 })}
                onClick={() => {
                  setStep(0);
                }}
              >
                이전 단계로
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
