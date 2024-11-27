import { useState } from "react";

const Prueba = () => {
    const [activeNotification, setActiveNotification] = useState(null);

    const requestPermission = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
            return;
        }

        if (Notification.permission !== "granted") {
            await Notification.requestPermission();
        }
    };

    const sendNotification = (duration = 5000) => {
        if (Notification.permission === "granted") {
            // Close previous notification if it exists
            if (activeNotification) {
                activeNotification.close();
            }

            
            const notification = new Notification("WhatsApp - Clone", {
                body: `Mensaje de prueba `,
                icon: "/path/to/your/icon.png",
                silent: false,
                requireInteraction: false,
                tag: "whatsapp-notification", // Same tag for replacement
            });

            setActiveNotification(notification);

            setTimeout(() => {
                notification.close();
                if (activeNotification === notification) {
                    setActiveNotification(null);
                }
            }, duration);

            notification.onclick = () => {
                window.focus();
                notification.close();
                setActiveNotification(null);
            };
        } else {
            requestPermission();
        }
    };

    const buttonClick = async () => {
        if (Notification.permission !== "granted") {
            await requestPermission();
        }
        // Add a small delay if there's an active notification
        if (activeNotification) {
            setTimeout(() => {
                sendNotification(3000);
            }, 100);
        } else {
            sendNotification(3000);
        }
    };

    return (
        <div className="page">
            <button onClick={buttonClick} className="button">
                Send Notification
            </button>
        </div>
    );
}

export default Prueba;
