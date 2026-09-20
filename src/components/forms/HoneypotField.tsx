/** Invisible honeypot for basic bot filtering. Not a substitute for server anti-abuse. */
export function HoneypotField() {
  return (
    <div
      className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      aria-hidden="true"
    >
      <label>
        Company website
        <input
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}
