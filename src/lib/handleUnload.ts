
 
 const handleUnload = async ( studySessionId: string| null,
  isOver: boolean
): Promise<void> => {
    if (!studySessionId || isOver) return;

    try {
     const result= await fetch("/api/finishSession", {
        method: "POST",
        body: JSON.stringify({ sessionId: studySessionId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("----------finished----------", result)
    } catch (err) {
      console.error("Failed to finish session on unload", err);
    }
  };
   export default handleUnload;