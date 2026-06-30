import { PERSON } from "./seo";

export const FORMSPREE_FORM_ID =
	process.env.FORMSPREE_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "mjgpgqjd";

export const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export const PHONE_TEL_HREF = `tel:${PERSON.phone.replace(/\s/g, "")}`;
