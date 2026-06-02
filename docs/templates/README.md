# Template Schemas

This folder contains pure YAML schema templates for each fact sheet type.

Each file in this directory is a YAML skeleton that defines the expected fields for the corresponding fact sheet type. Use these templates as the structure for authoring new fact sheets.

## How to use

1. Copy the appropriate template file from `docs/templates/*.yaml`.
2. Rename the copy to the target fact sheet file name under `docs/fact-sheets/`.
3. Fill in the YAML fields with the entity-specific values, including `id` and `title`.
4. Add any additional Markdown content below the YAML frontmatter if needed.

## Example

- `docs/templates/application.yaml` defines the fields for an application fact sheet.
- A new application fact sheet can be created as `docs/fact-sheets/application-erp-sap-s4.md`.

## Notes

- The template files are intentionally pure YAML to support later programmatic construction and validation.
- Content guidance and human-readable sections are separated from the schema definitions.
