"use client";
import React from "react";

// HOC için Props türü
type WithLoggerProps = {
    name?: string;
};

// HOC Tanımı
/**
 * withlogger P adında bir parametre alır ve Adı WrappedComponenttir
 * Bu bir componenttir ve bunun tipi React.ComponentType<P> dir
 * P ile wrapperın props türünü belirtiriz
 */
function withLogger<P>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoggerProps> {
  return (props: React.PropsWithChildren<P>) => {
    return <WrappedComponent
     name="withLogger"
    {...props} />;
  };
}

// Kullanılacak Bileşen
type MyComponentProps = {
  message: string;
};

const MyComponent: React.FC<MyComponentProps & WithLoggerProps> = (props) => {
  return <div></div>;
};

// HOC'yi Kullanarak Geliştirilmiş Bileşen
const LoggedComponent = withLogger(MyComponent);

// Uygulama
export default function Hoc() {
  return <LoggedComponent message="Hello, TypeScript HOC!" />;
}
