import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./header.module.css";

interface IProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Дополнительное содержимое шапки: счётчики, настройки, навигация. */
  children?: ReactNode;
}

/** Шапка страницы без собственных текстов: всё содержимое приходит пропсами, поэтому компонент переиспользуемый. */
export function Header({ title, subtitle, className, children }: IProps) {
  return (
    <header className={clsx(styles.header, className)}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </header>
  );
}
