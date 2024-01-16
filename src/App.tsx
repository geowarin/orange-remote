import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cc from "classcat";

const url = "http://192.168.1.15:8080/remoteControl/cmd";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  code: number;
  overrideClassName?: string;
}

function Button({
  children,
  code,
  className,
  overrideClassName,
  ...props
}: PropsWithChildren<ButtonProps>) {
  async function handleClick() {
    await fetch(url + `?operation=1&key=${code}&mode=0`);
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={cc([
        className,
        "bg-blue-8 p2 text-white rounded hover:bg-blue-9 text-lg border-none",
        overrideClassName,
      ])}
    >
      {children}
    </button>
  );
}

export function App() {
  return (
    <div className="bg-blue-950 w-full h-full flex gap-lg p2">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div className="grid grid-cols-3 h-90 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
              return (
                <Button
                  overrideClassName="bg-red-9 hover:bg-red"
                  className="w-20 h-20"
                  key={num}
                  code={512 + num}
                >
                  {num}
                </Button>
              );
            })}
            <Button className="w-20 h-20" code={403}>
              CHN -
            </Button>
            <Button
              overrideClassName="bg-red-9 hover:bg-red"
              className="w-20 h-20"
              code={512}
            >
              0
            </Button>
            <Button className="w-20 h-20" code={402}>
              CHN +
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <Button code={115}>VOL +</Button>
            <Button code={114}>VOL -</Button>
            <Button code={113}>MUTE</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 h-10 gap-1">
          <Button overrideClassName="bg-green-9 hover:bg-green" code={158}>
            BACK
          </Button>
          <Button code={103}>UP</Button>
          <div />
          <Button code={105}>LEFT</Button>
          <Button code={28}>OK</Button>
          <Button code={106}>RIGHT</Button>
          <div></div>
          <Button code={108}>DOWN</Button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
