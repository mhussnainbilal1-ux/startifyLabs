"use client";

import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as XLSX from "xlsx";
import styles from "./SpreadsheetEditor.module.css";

type CellValue = string | number | boolean | null;
type SpreadsheetData = CellValue[][];

const DEFAULT_COLUMN_WIDTH = 160;
const MIN_COLUMN_WIDTH = 70;
const DEFAULT_ROWS = 15;
const DEFAULT_COLUMNS = 6;

function createEmptySpreadsheet(
  rows: number,
  columns: number
): SpreadsheetData {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => "")
  );
}

function getExcelColumnName(index: number): string {
  let columnName = "";
  let currentIndex = index + 1;

  while (currentIndex > 0) {
    const remainder = (currentIndex - 1) % 26;

    columnName =
      String.fromCharCode(65 + remainder) + columnName;

    currentIndex = Math.floor(
      (currentIndex - 1) / 26
    );
  }

  return columnName;
}

function normalizeSpreadsheetData(
  importedData: SpreadsheetData
): SpreadsheetData {
  if (importedData.length === 0) {
    return createEmptySpreadsheet(
      DEFAULT_ROWS,
      DEFAULT_COLUMNS
    );
  }

  const maximumColumns = Math.max(
    DEFAULT_COLUMNS,
    ...importedData.map((row) => row.length)
  );

  const normalizedRows = importedData.map((row) => {
    const normalizedRow = [...row];

    while (normalizedRow.length < maximumColumns) {
      normalizedRow.push("");
    }

    return normalizedRow;
  });

  while (normalizedRows.length < DEFAULT_ROWS) {
    normalizedRows.push(
      Array.from(
        { length: maximumColumns },
        () => ""
      )
    );
  }

  return normalizedRows;
}

export default function SpreadsheetEditor() {
  const [data, setData] = useState<SpreadsheetData>(() =>
    createEmptySpreadsheet(
      DEFAULT_ROWS,
      DEFAULT_COLUMNS
    )
  );

  const [columnWidths, setColumnWidths] = useState<number[]>(
    () =>
      Array.from(
        { length: DEFAULT_COLUMNS },
        () => DEFAULT_COLUMN_WIDTH
      )
  );

  const [fileName, setFileName] = useState(
    "spreadsheet.xlsx"
  );

  const [sheetName, setSheetName] = useState("Sheet1");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const resizingColumnRef = useRef<number | null>(null);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(0);

  const columnCount = columnWidths.length;

  const handleResizeMove = useCallback(
    (event: globalThis.MouseEvent) => {
      const columnIndex = resizingColumnRef.current;

      if (columnIndex === null) {
        return;
      }

      const difference =
        event.clientX - resizeStartXRef.current;

      const newWidth = Math.max(
        MIN_COLUMN_WIDTH,
        resizeStartWidthRef.current + difference
      );

      setColumnWidths((currentWidths) => {
        const nextWidths = [...currentWidths];
        nextWidths[columnIndex] = newWidth;

        return nextWidths;
      });
    },
    []
  );

  const handleResizeEnd = useCallback(() => {
    resizingColumnRef.current = null;

    document.body.style.cursor = "";
    document.body.style.userSelect = "";

    window.removeEventListener(
      "mousemove",
      handleResizeMove
    );

    window.removeEventListener(
      "mouseup",
      handleResizeEnd
    );
  }, [handleResizeMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "mousemove",
        handleResizeMove
      );

      window.removeEventListener(
        "mouseup",
        handleResizeEnd
      );
    };
  }, [handleResizeEnd, handleResizeMove]);

  const startColumnResize = (
    event: ReactMouseEvent<HTMLDivElement>,
    columnIndex: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    resizingColumnRef.current = columnIndex;
    resizeStartXRef.current = event.clientX;
    resizeStartWidthRef.current =
      columnWidths[columnIndex];

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    window.addEventListener(
      "mousemove",
      handleResizeMove
    );

    window.addEventListener(
      "mouseup",
      handleResizeEnd
    );
  };

  const handleOpenFile = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setMessage("");

    try {
      const fileBuffer =
        await selectedFile.arrayBuffer();

      const workbook = XLSX.read(fileBuffer, {
        type: "array",
      });

      const firstSheetName = workbook.SheetNames[0];

      if (!firstSheetName) {
        throw new Error(
          "The spreadsheet does not contain any sheets."
        );
      }

      const worksheet =
        workbook.Sheets[firstSheetName];

      const importedData =
        XLSX.utils.sheet_to_json<CellValue[]>(
          worksheet,
          {
            header: 1,
            defval: "",
            raw: false,
          }
        );

      const normalizedData =
        normalizeSpreadsheetData(importedData);

      const importedColumnCount =
        normalizedData[0]?.length ??
        DEFAULT_COLUMNS;

      setData(normalizedData);

      setColumnWidths(
        Array.from(
          { length: importedColumnCount },
          (_, columnIndex) => {
            const worksheetWidth =
              worksheet["!cols"]?.[columnIndex]?.wch;

            if (
              typeof worksheetWidth === "number"
            ) {
              return Math.max(
                MIN_COLUMN_WIDTH,
                worksheetWidth * 8
              );
            }

            return DEFAULT_COLUMN_WIDTH;
          }
        )
      );

      setFileName(
        selectedFile.name.replace(
          /\.(xlsx|xls|csv)$/i,
          ""
        ) + ".xlsx"
      );

      setSheetName(firstSheetName);
      setMessage("Spreadsheet opened successfully.");
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to open the spreadsheet."
      );
    } finally {
      event.target.value = "";
    }
  };

  const updateCell = (
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => {
    setData((currentData) =>
      currentData.map((row, currentRowIndex) => {
        if (currentRowIndex !== rowIndex) {
          return row;
        }

        const updatedRow = [...row];
        updatedRow[columnIndex] = value;

        return updatedRow;
      })
    );
  };

  const addRow = () => {
    setData((currentData) => [
      ...currentData,
      Array.from(
        { length: columnCount },
        () => ""
      ),
    ]);
  };

  const addColumn = () => {
    setData((currentData) =>
      currentData.map((row) => [...row, ""])
    );

    setColumnWidths((currentWidths) => [
      ...currentWidths,
      DEFAULT_COLUMN_WIDTH,
    ]);
  };

  const deleteRow = (rowIndex: number) => {
    setData((currentData) => {
      if (currentData.length === 1) {
        return [
          Array.from(
            { length: columnCount },
            () => ""
          ),
        ];
      }

      return currentData.filter(
        (_, index) => index !== rowIndex
      );
    });
  };

  const deleteColumn = (columnIndex: number) => {
    if (columnCount <= 1) {
      setMessage(
        "The spreadsheet must have at least one column."
      );

      return;
    }

    setData((currentData) =>
      currentData.map((row) =>
        row.filter(
          (_, index) => index !== columnIndex
        )
      )
    );

    setColumnWidths((currentWidths) =>
      currentWidths.filter(
        (_, index) => index !== columnIndex
      )
    );
  };

  const createExcelBuffer = (): ArrayBuffer => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    worksheet["!cols"] = columnWidths.map(
      (width) => ({
        wch: Math.max(8, Math.round(width / 8)),
      })
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      sheetName.trim() || "Sheet1"
    );

    return XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    }) as ArrayBuffer;
  };

  const saveToDatabase = async () => {
    setIsSaving(true);
    setMessage("");
  
    try {
      const rowsWithContent = data.filter((row) =>
        row.some(
          (cell) =>
            String(cell ?? "").trim().length > 0
        )
      );
  
      if (rowsWithContent.length < 2) {
        throw new Error(
          "The spreadsheet needs one header row and at least one lead."
        );
      }
  
      const response = await fetch(
        "/api/leads/import",
        {
          method: "POST",
  
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({
            rows: rowsWithContent,
          }),
        }
      );
  
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        insertedCount?: number;
        skippedCount?: number;
        skippedRows?: Array<{
          row: number;
          reason: string;
        }>;
      };
  
      if (!response.ok || !result.success) {
        let errorMessage =
          result.message ||
          "Unable to save spreadsheet data.";
  
        if (
          result.skippedRows &&
          result.skippedRows.length > 0
        ) {
          const skippedDetails = result.skippedRows
            .slice(0, 10)
            .map(
              (item) =>
                `Row ${item.row}: ${item.reason}`
            )
            .join(" | ");
  
          errorMessage += ` ${skippedDetails}`;
        }
  
        throw new Error(errorMessage);
      }
  
      let successMessage =
        result.message ||
        "Spreadsheet saved successfully.";
  
      if (
        result.skippedCount &&
        result.skippedCount > 0
      ) {
        const skippedDetails = result.skippedRows
          ?.slice(0, 10)
          .map(
            (item) =>
              `Row ${item.row}: ${item.reason}`
          )
          .join(" | ");
  
        if (skippedDetails) {
          successMessage += ` ${skippedDetails}`;
        }
      }
  
      setMessage(successMessage);
    } catch (error) {
      console.error(
        "Save spreadsheet to database error:",
        error
      );
  
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to save spreadsheet data.";
  
      setMessage(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadSpreadsheet = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet =
        XLSX.utils.aoa_to_sheet(data);

      worksheet["!cols"] = columnWidths.map(
        (width) => ({
          wch: Math.max(8, Math.round(width / 8)),
        })
      );

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        sheetName.trim() || "Sheet1"
      );

      XLSX.writeFile(
        workbook,
        fileName.trim() || "spreadsheet.xlsx"
      );

      setMessage("Spreadsheet downloaded.");
    } catch (error) {
      console.error(error);
      setMessage("Unable to download the spreadsheet.");
    }
  };

  return (
    <section className={styles.editor}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Spreadsheet Editor
          </h1>

          <p className={styles.description}>
            Open, edit, resize and save Excel files.
          </p>
        </div>

        <label className={styles.openButton}>
          Open spreadsheet

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleOpenFile}
            className={styles.hiddenInput}
          />
        </label>
      </div>

      <div className={styles.settings}>
        <label className={styles.field}>
          <span>File name</span>

          <input
            type="text"
            value={fileName}
            onChange={(event) =>
              setFileName(event.target.value)
            }
          />
        </label>

        <label className={styles.field}>
          <span>Sheet name</span>

          <input
            type="text"
            value={sheetName}
            onChange={(event) =>
              setSheetName(event.target.value)
            }
          />
        </label>
      </div>

      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={addRow}
          className={styles.secondaryButton}
        >
          Add row
        </button>

        <button
          type="button"
          onClick={addColumn}
          className={styles.secondaryButton}
        >
          Add column
        </button>

              <button
                  type="button"
                  onClick={saveToDatabase}
                  disabled={isSaving}
                  className={styles.primaryButton}
              >
                  {isSaving
                      ? "Saving Leads..."
                      : "Save All to Database"}
              </button>
        <button
          type="button"
          onClick={downloadSpreadsheet}
          className={styles.secondaryButton}
        >
          Download Excel
        </button>
      </div>

      {message && (
        <div className={styles.message}>
          {message}
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.rowNumberColumn} />

            {columnWidths.map((width, index) => (
              <col
                key={index}
                style={{
                  width,
                  minWidth: width,
                  maxWidth: width,
                }}
              />
            ))}
          </colgroup>

          <thead>
            <tr>
              <th
                className={styles.cornerCell}
                aria-label="Row numbers"
              />

              {columnWidths.map((_, columnIndex) => (
                <th
                  key={columnIndex}
                  className={styles.columnHeader}
                >
                  <div
                    className={
                      styles.columnHeaderContent
                    }
                  >
                    <span>
                      {getExcelColumnName(
                        columnIndex
                      )}
                    </span>

                    <button
                      type="button"
                      className={
                        styles.deleteColumnButton
                      }
                      onClick={() =>
                        deleteColumn(columnIndex)
                      }
                      title={`Delete column ${getExcelColumnName(
                        columnIndex
                      )}`}
                      aria-label={`Delete column ${getExcelColumnName(
                        columnIndex
                      )}`}
                    >
                      ×
                    </button>
                  </div>

                  <div
                    role="separator"
                    aria-orientation="vertical"
                    aria-label={`Resize column ${getExcelColumnName(
                      columnIndex
                    )}`}
                    className={styles.resizeHandle}
                    onMouseDown={(event) =>
                      startColumnResize(
                        event,
                        columnIndex
                      )
                    }
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className={styles.rowHeader}>
                  <span>{rowIndex + 1}</span>

                  <button
                    type="button"
                    className={styles.deleteRowButton}
                    onClick={() =>
                      deleteRow(rowIndex)
                    }
                    title={`Delete row ${
                      rowIndex + 1
                    }`}
                    aria-label={`Delete row ${
                      rowIndex + 1
                    }`}
                  >
                    ×
                  </button>
                </th>

                {Array.from({
                  length: columnCount,
                }).map((_, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={styles.cell}
                  >
                    <input
                      type="text"
                      value={
                        row[columnIndex] === null ||
                        row[columnIndex] ===
                          undefined
                          ? ""
                          : String(row[columnIndex])
                      }
                      onChange={(event) =>
                        updateCell(
                          rowIndex,
                          columnIndex,
                          event.target.value
                        )
                      }
                      className={styles.cellInput}
                      aria-label={`Row ${
                        rowIndex + 1
                      }, column ${getExcelColumnName(
                        columnIndex
                      )}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


// spreadsheet columns
// Company
// Contact
// Email
// Website
// LinkedIn
// Country
// Industry
// Employees
// Service
// Status
// Priority
// Outsource Probability
// Project Size
// Source
// Tech Stack
// Follow Up
// Last Contacted
// Notes