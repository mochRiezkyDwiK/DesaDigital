import os

# Update this to your actual root directory path
path_project = r"C:\Your\Path\Here"

# os.path.join safely constructs the path depending on your operating system
base_dir = os.path.join(
    path_project,
    "DesaDigital", "src", "main", "java", "com", "DigitalVillageHub", "demo"
)

replacements = {
    "package com.DigitalVillageHub.demo.entity;": "package com.DigitalVillageHub.demo.model.entity;",
    "import com.DigitalVillageHub.demo.entity.": "import com.DigitalVillageHub.demo.model.entity.",
    "package com.DigitalVillageHub.demo.dto;": "package com.DigitalVillageHub.demo.model.dto;",
    "import com.DigitalVillageHub.demo.dto.": "import com.DigitalVillageHub.demo.model.dto.",
    "package com.DigitalVillageHub.demo.repository;": "package com.DigitalVillageHub.demo.persistence;",
    "import com.DigitalVillageHub.demo.repository.": "import com.DigitalVillageHub.demo.persistence."
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {filepath}")

# Safety check: Verify the directory exists before attempting to walk it
if not os.path.exists(base_dir):
    print(f"Error: The directory does not exist:\n{base_dir}")
else:
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".java"):
                process_file(os.path.join(root, file))

    print("Done.")