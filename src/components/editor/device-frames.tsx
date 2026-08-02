"use client";
import * as React from "react";
import { PHONE_SCREEN } from "@/lib/constants";
import { img } from "@/lib/image-cache";

type FrameProps = {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
  /** When true, hide EmptySlot placeholder (so it doesn't bake into exports). */
  hideEmpty?: boolean;
};

// iPhone — uses pre-measured mockup.png overlay
export function Phone({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "1022 / 2082", ...style }}>
      <img
        src={img("/mockup.png")}
        alt=""
        style={{ display: "block", width: "100%", height: "100%" }}
        draggable={false}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          overflow: "hidden",
          left: `${PHONE_SCREEN.L}%`,
          top: `${PHONE_SCREEN.T}%`,
          width: `${PHONE_SCREEN.W}%`,
          height: `${PHONE_SCREEN.H}%`,
          borderRadius: `${PHONE_SCREEN.RX}% / ${PHONE_SCREEN.RY}%`,
          background: "#111",
        }}
      >
        {resolved ? (
          <img
            src={resolved}
            alt={alt}
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            draggable={false}
          />
        ) : hideEmpty ? null : (
          <EmptySlot />
        )}
      </div>
    </div>
  );
}

export function AndroidPhone({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "9 / 19.5", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8% / 4%",
          background: "linear-gradient(160deg, #2a2a2e 0%, #18181b 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.55)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1.5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "3%",
            height: "1.4%",
            borderRadius: "50%",
            background: "#0d0d0f",
            border: "1px solid rgba(255,255,255,0.06)",
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "3.5%",
            top: "2%",
            width: "93%",
            height: "96%",
            borderRadius: "5.5% / 2.6%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
    </div>
  );
}

export function AndroidTabletP({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "5 / 8", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "4.5% / 2.8%",
          background: "linear-gradient(160deg, #2a2a2e 0%, #18181b 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 48px rgba(0,0,0,0.6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1.2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1.4%",
            height: "0.88%",
            borderRadius: "50%",
            background: "#0d0d0f",
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "3.5%",
            top: "2.2%",
            width: "93%",
            height: "95.6%",
            borderRadius: "2.5% / 1.6%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
    </div>
  );
}

export function AndroidTabletL({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "8 / 5", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "2.8% / 4.5%",
          background: "linear-gradient(160deg, #2a2a2e 0%, #18181b 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 48px rgba(0,0,0,0.6)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "1.2%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "0.88%",
            height: "1.4%",
            borderRadius: "50%",
            background: "#0d0d0f",
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "2.2%",
            top: "3.5%",
            width: "95.6%",
            height: "93%",
            borderRadius: "1.6% / 2.5%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
    </div>
  );
}

/** iPad 竖屏机框（宽高比与 IPAD_RATIO 一致） */
export function IPad({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "770 / 1000", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "5% / 3.6%",
          background: "linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 100%)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1.2%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0.9%",
            height: "0.65%",
            borderRadius: "50%",
            background: "#111113",
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "4%",
            top: "2.8%",
            width: "92%",
            height: "94.4%",
            borderRadius: "2.2% / 1.6%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * iPad 横屏机框：竖屏机框宽高对调，摄像头落在长边上沿。
 * 配合上文下图布局（hero / device-bottom）使用。
 */
export function IPadLandscape({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "1000 / 770", ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "3.6% / 5%",
          background: "linear-gradient(180deg, #2C2C2E 0%, #1C1C1E 100%)",
          position: "relative",
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1.6%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0.65%",
            height: "0.9%",
            borderRadius: "50%",
            background: "#111113",
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "2.8%",
            top: "4%",
            width: "94.4%",
            height: "92%",
            borderRadius: "1.6% / 2.2%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * MacBook 整机框：深色铝合金机身 + 窄边框屏幕 + 底部底座。
 * 宽高比 16:10.8，与 constants.MACBOOK_RATIO 一致；用于 macOS 默认设备布局。
 */
export function MacBook({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div style={{ position: "relative", aspectRatio: "16 / 10.8", ...style }}>
      {/* 屏幕盖 + 机身 */}
      <div
        style={{
          position: "absolute",
          left: "1%",
          top: "0%",
          width: "98%",
          height: "92%",
          borderRadius: "1.4% / 2%",
          background: "linear-gradient(180deg, #3A3A3C 0%, #1C1C1E 100%)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12), 0 12px 48px rgba(0,0,0,0.55)",
          overflow: "hidden",
        }}
      >
        {/* 摄像头点 */}
        <div
          style={{
            position: "absolute",
            top: "1.1%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "0.55%",
            height: "0.85%",
            borderRadius: "50%",
            background: "#0a0a0c",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            zIndex: 20,
          }}
        />
        {/* 屏幕内容区 */}
        <div
          style={{
            position: "absolute",
            left: "1.6%",
            top: "3.2%",
            width: "96.8%",
            height: "93.5%",
            borderRadius: "0.4% / 0.55%",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {resolved ? (
            <img
              src={resolved}
              alt={alt}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
              draggable={false}
            />
          ) : hideEmpty ? null : (
            <EmptySlot />
          )}
        </div>
      </div>
      {/* 底部铰链 / 底座 */}
      <div
        style={{
          position: "absolute",
          left: "0%",
          bottom: "0%",
          width: "100%",
          height: "8.5%",
          borderRadius: "0 0 1.2% 1.2% / 0 0 40% 40%",
          background: "linear-gradient(180deg, #2C2C2E 0%, #1A1A1C 55%, #121214 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 20px rgba(0,0,0,0.35)",
        }}
      >
        {/* 触控板暗示凹槽 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "28%",
            transform: "translateX(-50%)",
            width: "18%",
            height: "18%",
            borderRadius: "2px",
            background: "rgba(0,0,0,0.25)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * macOS 应用窗口框：圆角窗口 + 红黄绿交通灯标题栏。
 * 宽高比 16:10.2，与 constants.MAC_WINDOW_RATIO 一致；用于 mac-window 布局。
 */
export function MacWindow({ src, alt = "", style, hideEmpty }: FrameProps) {
  const resolved = img(src);
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10.2",
        borderRadius: "1.2% / 1.8%",
        overflow: "hidden",
        background: "#1C1C1E",
        boxShadow:
          "0 20px 60px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.1)",
        ...style,
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "5.5%",
          background: "linear-gradient(180deg, #3A3A3C 0%, #2C2C2E 100%)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
          display: "flex",
          alignItems: "center",
          paddingLeft: "1.4%",
          gap: "0.7%",
          zIndex: 20,
        }}
      >
        <span
          style={{
            width: "1.15%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: "#FF5F57",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)",
          }}
        />
        <span
          style={{
            width: "1.15%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: "#FEBC2E",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)",
          }}
        />
        <span
          style={{
            width: "1.15%",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: "#28C840",
            boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.2)",
          }}
        />
      </div>
      {/* 内容区 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "5.5%",
          width: "100%",
          height: "94.5%",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {resolved ? (
          <img
            src={resolved}
            alt={alt}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
            draggable={false}
          />
        ) : hideEmpty ? null : (
          <EmptySlot />
        )}
      </div>
    </div>
  );
}

function EmptySlot() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.4)",
        fontSize: "min(2vw, 14px)",
        background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
        textAlign: "center",
        padding: "4%",
      }}
    >
      Drop a screenshot here
    </div>
  );
}
