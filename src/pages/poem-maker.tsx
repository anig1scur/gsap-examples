import "./poem-maker.scss";
import { FC, useState, useRef, CSSProperties, useLayoutEffect } from "react";
import Intro from "@/assets/intro.png";
import TitleImg from "@/assets/title-img.png";

export type Props = {
  n_lines: number;
  max_chosen: number;
  bg_color: string;
  quotes: string[];
  background_imgs: string[];
  tip?: string;
};

enum Status {
  "pre",
  "ing",
  "done",
}

function splitArraySymmetrically(
  strings: string[],
  n: number,
): string[][] | null {
  const subArrays: string[][] = [];
  const minSubArrayLength = 2;
  const maxSubArrayLength = strings.length % n;

  let index = 0;

  for (let i = 0; i < n; i++) {
    let subArrayLength: number;
    if (i < n / 2) {
      subArrayLength = minSubArrayLength + i;
    } else {
      subArrayLength = maxSubArrayLength - (i - Math.floor(n / 2));
    }

    const subArray: string[] = [];

    for (let j = 0; j < subArrayLength && index < strings.length; j++) {
      subArray.push(strings[index]);
      index++;
    }

    subArrays.push(subArray);
  }

  return subArrays;
}

const PoemMaker: FC<Props> = (props: Props) => {
  const {
    n_lines = 5,
    max_chosen = 6,
    bg_color = "#976A14",
    tip = "用balabala创作一首独属于自己的拼贴诗",
    quotes = [
      "彪子，你太爱学习了！",
      "往前看，别回头",
      "整个宇宙将为你闪烁",
      "老墨，我想吃鱼了",
      "“可以，但没必要”",
      "妍珍呐",
      "什么破晚霞，还美成这样",
      "马看见什么，是run决定的。",
      "虫子从来没有被战胜过",
      "我是一只小小小小鸟",
      "我想去看看外面的世界",
      "你是我的小苹果",
      "她明明是个男孩子",
      "这么可爱，不可能是男孩子",
      "短暂的人生，长久的回忆",
      "我想要一切",
      "你们都是坏人",
      "啊，我又饿了",
      "马斯卡彭牛乳卷真的好好吃!!",
    ],
  } = props;

  const galleryRef = useRef<HTMLDivElement>(null);
  const [chosen, setChosen] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>(Status.pre);

  if (!quotes) {
    return null;
  }

  useLayoutEffect(() => {
    // 这个做法好奇怪求专业的正确的处理方案 ?
    // scroll poem-maker-ing-gallery to center
    if (status === Status.ing && galleryRef.current) {
      galleryRef.current.scrollTo({
        left: galleryRef.current.scrollWidth / 4,
      });
    }
  }, [status]);

  return (
    <div
      className="poem-maker"
      style={
        {
          "--bg-color": bg_color,
        } as CSSProperties
      }
    >
      <div className="poem-maker-content">
        {status === Status.pre && (
          <div className="poem-maker-pre">
            <img className="poem-maker-pre-title-img" src={TitleImg} />
            <img className="poem-maker-pre-intro" src={Intro} />
            <button
              className="poem-maker-button"
              onClick={() => setStatus(Status.ing)}
            >
              开始拼贴
            </button>
            <div className="poem-maker-pre-tip">{tip}</div>
          </div>
        )}
        {status === Status.ing && (
          <div className="poem-maker-ing">
            <div className="poem-maker-ing-rule">👇请选出 3-6 句台词</div>
            <div className="poem-maker-ing-gallery-wrapper" ref={galleryRef}>
              <div className="poem-maker-ing-gallery">
                {splitArraySymmetrically(quotes, n_lines)?.map(
                  (line, index) => (
                    <div className="poem-maker-ing-line" key={index}>
                      {line.map((quote, index) => (
                        <div
                          className={`poem-maker-ing-quote ${
                            chosen.includes(quote) ? "chosen" : ""
                          }`}
                          data-index={chosen.indexOf(quote) + 1}
                          key={index}
                          onClick={() => {
                            if (
                              chosen.length >= max_chosen &&
                              !chosen.includes(quote)
                            ) {
                              alert(`最多选择 ${max_chosen} 句台词`);
                              return;
                            }

                            if (chosen.includes(quote)) {
                              setChosen(
                                chosen.filter((item) => item !== quote),
                              );
                            } else {
                              setChosen([...chosen, quote]);
                            }
                          }}
                        >
                          {quote}
                        </div>
                      ))}
                    </div>
                  ),
                )}
              </div>
            </div>
            <button
              className="poem-maker-button"
              onClick={() => setStatus(Status.done)}
            >
              拼成我的专属诗歌 :D
            </button>
          </div>
        )}
        {status === Status.done && (
          <div className="poem-maker-done">
            <button
              className="poem-maker-button"
              onClick={() => setStatus(Status.ing)}
            >
              重新创作
            </button>

            <button
              className="poem-maker-button"
              onClick={() => setStatus(Status.done)}
            >
              保存分享
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemMaker;
