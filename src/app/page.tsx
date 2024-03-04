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
import { ModeToggle } from "@/app/_components/ModeToggle";

const SchemaCheck = z.object({
  username: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }).max(100, { message: "이름은 100글자 이하이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일을 입력해주세요." }),
  phone: z
    .string()
    .min(11, "연락처는 11자리여야 합니다.")
    .max(11, "연락처는 11자리여야 합니다.")
    .refine((value) => /^010\d{8}$/.test(value), "010으로 시작하는 11자리 숫자를 입력해주세요"),
  role: z.string().min(2, { message: "역할을 선택해주세요." }),
});

export default function Home() {
  const form = useForm<z.infer<typeof SchemaCheck>>({
    resolver: zodResolver(SchemaCheck),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      role: "",
    },
  });

  function onSubmit(values: z.infer<typeof SchemaCheck>) {
    console.log(values);
  }

  return (
    <>
      <ModeToggle />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle>계정을 생성합니다</CardTitle>
            <CardDescription>필수 정보를 입력해볼게요</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-3 overflow-x-hidden">
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
                <Button type="submit">다음 단계로 ⭢</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
