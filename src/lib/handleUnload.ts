
 
 const handleUnload = async ( studySessionId: string| null,
  isOver: boolean
): Promise<void> => {
    if (!studySessionId || isOver) return;

    try {
      await fetch("/api/studySessionFinish", {
        method: "POST",
        body: JSON.stringify({ sessionId: studySessionId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Failed to finish session on unload", err);
    }
  };
   export default handleUnload;