import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: ["aadeb42f91a814953fecccfae030312591ee01e7fc4873e01738b2c761bff2855f006016aac196d999f703b1523546a50e2756385ce9be30f5e0cc449ab25653"], // Replace with your secret key
    secure: process.env.NODE_ENV === "production",
  },
});

export { getSession, commitSession, destroySession };