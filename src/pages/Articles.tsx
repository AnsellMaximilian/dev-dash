import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useDevData } from "../hooks/dev";

export default function Articles() {
  const { articles } = useDevData();

  return (
    <div>
      <div>
        <Grid
          // onRowClick={handleGridRowClick}
          data={articles.data}
          pageSize={1}
          pageable={true}
          sortable={true}
          style={{ height: "400px" }}
          onPageChange={(e) => {
            console.log(e);
          }}
        >
          <GridColumn field="id" title="ID" />
          <GridColumn field="title" title="Title" />
          <GridColumn field="url" title="URL" />
        </Grid>
      </div>
    </div>
  );
}
