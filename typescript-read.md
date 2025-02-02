
* MyLibrary.BaseComponent<{ onClick: (e: MyLibrary.ClickEvent) => void }>
namespace MyLibrary {
  export type BaseComponent<T> = {
    props: T;
    render: () => string;
  };

  export interface ClickEvent {
    target: string;
    type: "click";
  }
}


const ButtonComponent: MyLibrary.BaseComponent<{ onClick: (e: MyLibrary.ClickEvent) => void }> = {
  props: {
    onClick: (e) => {
      console.log(e.target);
    },
  },
  render() {
    return "<button>Click me</button>";
  },
}