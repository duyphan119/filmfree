"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "./client";
import { revalidatePath } from "next/cache";

export const login = (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    cookies().set("isSignedIn", "true", {
      maxAge: 1000 * 60 * 60 * 12,
    });
    return redirect("/admin");
  }
};

export const deleteMovie = async (movieId: string, url: string) => {
  await prisma.movie.delete({
    where: { id: movieId },
  });
  revalidatePath(url);
};
