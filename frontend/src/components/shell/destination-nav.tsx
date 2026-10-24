import { House, UserRound } from "lucide-react";
import { NavLink } from "react-router";
import { cx } from "@/utils/cx";

const destinations = [
  { to: "/home", label: "Home", icon: House },
  { to: "/account", label: "Account", icon: UserRound },
] as const;

export function DestinationNav({ placement }: { placement: "rail" | "bar" }) {
  return (
    <ul className={cx("flex gap-2", placement === "rail" ? "flex-col" : "justify-around")}>
      {destinations.map((destination) => {
        const Icon = destination.icon;
        return (
          <li key={destination.to} className={placement === "bar" ? "flex-1" : undefined}>
            <NavLink
              to={destination.to}
              end
              className={({ isActive }) =>
                cx(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 text-base",
                  placement === "bar" && "justify-center",
                  isActive
                    ? "border-s-2 border-s-[var(--swiftradish-mark)] bg-background-primary-default font-semibold text-text-primary"
                    : "text-text-secondary",
                )
              }
            >
              <Icon className="size-6 shrink-0" aria-hidden="true" />
              <span>{destination.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
