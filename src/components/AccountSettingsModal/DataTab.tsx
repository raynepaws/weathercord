import { accountsTable, AuthorizedAccountFromAPI } from "@/db/schema";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";

const typeString = (column: SQLiteColumn) => {
  let string = column.dataType;
  if (column.notNull) string += " not null";
  if (column.isUnique) string += " unique";
  return string;
};

const renderData = (data: string | number | boolean | null) => {
  if (data === null) {
    return (
      <i className="text-(--sub)">null</i>
    );
  } else if (typeof data === "string") {
    return data;
  } else if (typeof data === "number") {
    return (
      <span className="text-(--accent)">{data}</span>
    );
  } else if (typeof data === "boolean") {
    return (
      <span className="text-(--accent)">{data ? "true" : "false"}</span>
    );
  }
}

const DataTab = (props: {
  account: AuthorizedAccountFromAPI
}) => {
  return (
    <table>
      <tbody>
        {Object.keys(props.account).sort().map((_key) => {
          if (["avatar", "banner", "connections"].includes(_key)) return;
          console.log(_key);
          const key = _key as keyof AuthorizedAccountFromAPI & keyof typeof accountsTable;
          return (
            <tr key={key}>
              <td className="p-1">
                <code>{key}</code><br />
                <sub><code>{typeString(accountsTable[key])}</code></sub>
              </td>
              <td className="p-1">
                <pre>
                  <code>
                    {renderData(props.account[key])}
                  </code>
                </pre>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTab;
