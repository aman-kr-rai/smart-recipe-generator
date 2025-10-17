async function generateRecipe() {
    const ingredients = document.getElementById('ingredients').value;
    if (!ingredients) {
        alert("Please enter ingredients");
        return;
    }

    document.getElementById('recipe').innerText = "Generating recipe...";

    try {
        const response = await fetch('http://localhost:5000/generate-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients })
        });

        if (!response.ok) throw new Error("Failed to generate recipe");

        const data = await response.json();
        document.getElementById('recipe').innerText = data.recipe;

    } catch (err) {
        document.getElementById('recipe').innerText = "Error: " + err.message;
    }
}
