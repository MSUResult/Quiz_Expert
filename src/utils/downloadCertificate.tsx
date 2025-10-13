import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";
import Certificate from "../components/vedic-math/Certificate";

export const handleDownloadCertificate = async (results, userName) => {
  // 1️⃣ Create hidden container
  const certificateContainer = document.createElement("div");
  document.body.appendChild(certificateContainer);

  Object.assign(certificateContainer.style, {
    position: "absolute",
    top: "-9999px",
    left: "0px",
    width: "1024px",
    backgroundColor: "white",
    zIndex: "-1",
  });

  // 2️⃣ Render React component inside
  const reactRootElement = document.createElement("div");
  certificateContainer.appendChild(reactRootElement);

  const root = createRoot(reactRootElement);
  root.render(<Certificate results={results} userName={userName} />);

  // 3️⃣ Wait for rendering + styles to apply
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    // 4️⃣ Convert to PNG
    const dataUrl = await toPng(reactRootElement, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      cacheBust: true,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    });

    // 5️⃣ Trigger download
    const link = document.createElement("a");
    link.download = `Expert-Academy-Certificate-${userName.replace(
      /\s+/g,
      "_"
    )}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("❌ Failed to download certificate:", err);
  } finally {
    // 6️⃣ Cleanup
    root.unmount();
    document.body.removeChild(certificateContainer);
  }
};
