"use client";

import { useActionState } from "react";

import { saveHeroText, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/50";

type Field = { key: string; label: string; value: string };

/** 첫 화면(히어로) 글자 수정 칸. 칸을 비우고 저장하면 site.config.ts 의 글자로 돌아갑니다. */
export function HeroForm({ fields }: { fields: Field[] }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveHeroText, {});

  return (
    <form action={action} className="grid gap-4">
      {fields.map((field) => (
        <label key={field.key} className="grid gap-1.5 text-sm">
          <span className="font-medium">{field.label}</span>
          {field.key === "hero.title" || field.key === "hero.description" ? (
            <textarea name={field.key} rows={2} defaultValue={field.value} className={inputClass} />
          ) : (
            <input name={field.key} defaultValue={field.value} className={`h-10 ${inputClass}`} />
          )}
        </label>
      ))}

      <p className="text-xs text-muted-foreground">
        칸을 비우고 저장하면 처음 글자(site.config.ts)로 돌아갑니다.
      </p>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중..." : "글자 저장"}
        </Button>
        {state.message ? (
          <p className={state.ok ? "text-sm text-muted-foreground" : "text-sm text-destructive"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
