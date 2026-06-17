import asyncio
import os
import re
import edge_tts

# Configuration of project paths relative to root
MOCKS_DIR = os.path.join("src", "mocks")
AUDIO_DIR = os.path.join("public", "audio")

# Audio tracks data specification for Call Mock 1
MOCK_1_AUDIO_DATA = [
    {
        "file_name": "call_01_turn_01.mp3",
        "text": "Hello, is this the pizza delivery service?",
        "voice": "en-US-BrianNeural"  # Male caller
    },
    {
        "file_name": "call_01_turn_02.mp3",
        "text": "Hello! No, you have reached the IU Akademie support line. How can I help you today?",
        "voice": "en-US-AvaNeural"    # Female AI assistant
    },
    {
        "file_name": "call_01_turn_03.mp3",
        "text": "Oh, I am so sorry, wrong number. Have a good day, goodbye!",
        "voice": "en-US-BrianNeural"  # Male caller
    }
]

def clean_json_keys_in_mocks() -> None:
    """Removes double quotes from object keys to enforce idiomatic TypeScript style."""
    if not os.path.exists(MOCKS_DIR):
        print(f"Error: Directory {MOCKS_DIR} not found. Skipping cleanup step.")
        return

    print("Executing cleanup of mock TypeScript file headers and keys...")
    target_files = ["call-mock-2.ts", "call-mock-3.ts"]
    
    # Regular expression matching "key": sequence inside JSON-exported payloads
    key_regex = re.compile(r'"(\w+)":')

    for file_name in target_files:
        file_path = os.path.join(MOCKS_DIR, file_name)
        if not os.path.exists(file_path):
            print(f"Warning: Target file not found: {file_path}")
            continue

        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        # Transform '"turn_id":' pattern into 'turn_id:'
        cleaned_content = key_regex.sub(r"\1:", content)

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(cleaned_content)
        
        print(f"Cleaned up syntax quotes successfully in: {file_name}")

async def generate_mock_1_audio() -> None:
    """Synthesizes the missing audio tracks for the short wrong-number call mock."""
    os.makedirs(AUDIO_DIR, exist_ok=True)
    print("Initiating TTS audio synthesis sequence for Call Mock 1...")

    for turn in MOCK_1_AUDIO_DATA:
        target_path = os.path.join(AUDIO_DIR, turn["file_name"])
        print(f"Generating track: {target_path}")
        
        communicate = edge_tts.Communicate(turn["text"], turn["voice"])
        await communicate.save(target_path)
        
    print("Audio assets generation sequence executed successfully.")

async def main() -> None:
    # Task 1: Sanitize and formatting pass over the keys
    clean_json_keys_in_mocks()
    print("-" * 50)
    # Task 2: Build missing audio layers
    await generate_mock_1_audio()

if __name__ == "__main__":
    asyncio.run(main())