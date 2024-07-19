"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfileLink({ userId }) {
  return <Link href={`/user/${userId}`}>Profile</Link>;
}
