import React, { useEffect, useState } from "react";
import { useFetchTables, Table, updateTableStatus } from "@/models/Tables";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddIcon from "@mui/icons-material/Add";
import { Menu, useFetchMenus } from "@/models/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ManageTable = () => {
  const tables = useFetchTables();
  const [value, setValue] = React.useState<number | number[]>(1);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setValue(newValue);
  };

  // Sử dụng hook useFetchMenus trực tiếp trong component
  const menusFromAPI = useFetchMenus();

  useEffect(() => {
    // Lắng nghe thay đổi của biến menusFromAPI
    // và cập nhật biến menus và showMenu khi dữ liệu đã được lấy thành công
    if (menusFromAPI.length > 0) {
      setMenus(menusFromAPI);
      setShowMenu(true);
    }
  }, [menusFromAPI]);

  const menuTypes: string[] = [
    "Combo",
    "Pickle",
    "Beverages",
    "Meat",
    "Beef",
    "Soda",
    "Vegetable",
    "Hotpots",
    "Sausace",
  ];

  // Biến trạng thái để theo dõi hiển thị phần thêm mới
  const [addingNew, setAddingNew] = useState(false);

  // Hàm xử lý khi nhấn nút AddIcon
  const handleAddNew = () => {
    setAddingNew(true); // Hiển thị phần thêm mới
    setSelectedMenu(null); // Đặt selectedMenu về null để các trường còn lại trống
  };

  return (
    <>
      <TabContext value={value.toString()}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value.toString()}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                sx={{
                  "& .MuiTab-root": {
                    color: "#9e9e9e", // Màu chữ khi không được chọn
                  },
                  "& .Mui-selected": {
                    color: "white", // Màu chữ khi được chọn
                  },
                }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={`Danh Sách Bàn`} value="1" />
                <Tab label={`Danh Sách Menu`} value="2" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            {/* Grid item cho danh sách bàn */}
            <Grid item xs={7}>
              <Grid container spacing={2}>
                {tables
                  .sort((a, b) => a.table_number - b.table_number)
                  .map((table: Table) => (
                    <Grid item xs={4} key={table.table_number}>
                      <Button
                        variant="contained"
                        sx={{
                          height: "100px",
                          width: "200px",
                          background: table.status ? "" : "white",
                          color: table.status ? "white" : "black",
                        }}
                      >
                        {`Bàn số ${table.table_number}`}
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Box
                sx={{
                  position: "fixed",
                  bottom: 0,
                  padding: 2,
                  background: "#fff",
                }}
              >
                <Stack direction="column" spacing={2}>
                  <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={2}></Stack>
                    <Typography>Tổng tiền:</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      style={{
                        height: "50px",
                        width: "150px",
                        color: "white",
                        backgroundColor: "gray",
                      }}
                    >
                      Tạm Tính
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        height: "50px",
                        width: "150px",
                        color: "white",
                        backgroundColor: "green",
                      }}
                    >
                      Thanh Toán
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        height: "50px",
                        width: "150px",
                        background: "#ffffff",
                        color: "gray",
                      }}
                    >
                      Thông Báo
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          <Stack direction={"row"}>
            <Box>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{ width: "100px" }}
                onClick={handleAddNew} // Gọi hàm xử lý khi nhấn nút AddIcon
              >
                Thêm
              </Button>
              <Box
                sx={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  marginTop: "20px",
                }}
              >
                {showMenu && (
                  <Box sx={{ p: "16px 10px 16px 10px" }}>
                    {menus
                      .filter((menu) => menu.price !== 0)
                      .sort((a, b) => b.price - a.price)
                      .map((menu, index) => (
                        <Grid item key={index}>
                          <ListItem onClick={() => setSelectedMenu(menu)}>
                            <Grid container spacing={2}>
                              {/* Phần hình ảnh */}
                              <Grid item xs={3}>
                                <Box
                                  component="img"
                                  alt={menu.name}
                                  src={menu.path}
                                  sx={{
                                    maxWidth: "120px",
                                    maxHeight: "120px",
                                    borderRadius: "16px",
                                  }}
                                />
                              </Grid>
                              {/* Phần name và price */}
                              <Grid item xs={6}>
                                <Stack direction="column">
                                  <Typography sx={{ fontWeight: 700 }}>
                                    {menu.name}
                                  </Typography>
                                  <Typography sx={{ fontWeight: 700 }}>
                                    {menu.price.toLocaleString("vi-VN")}VNĐ
                                  </Typography>
                                </Stack>
                              </Grid>
                              {/* Phần button Delete và Edit */}
                              <Grid item xs={3}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    sx={{ width: "100px" }}
                                  >
                                    Xóa
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </Grid>
                      ))}
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ position: "sticky", top: 0 }}>
              <Stack direction="column" spacing={2} alignItems="center">
                {/* Phần thêm mới */}
                {addingNew && !selectedMenu && (
                  <Box sx={{ p: "16px 10px 16px 10px" }}>
                    <Stack spacing={3}>
                      <Box
                        component="img"
                        alt="Default"
                        src="https://thaibinhtv.vn/assets/images/imgstd.jpg"
                        sx={{
                          width: "200px",
                          height: "200px",
                          pb: "10px",
                          borderRadius: "16px",
                          margin: "0 auto",
                        }}
                      />
                      {/* Phần tải ảnh lên */}
                      <input type="file" accept="image/*" />
                    </Stack>
                    <TextField
                      id="menu-name"
                      label="Tên món"
                      value=""
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2, marginTop: "10px" }}
                    />
                    <TextField
                      id="menu-price"
                      label="Giá"
                      value=""
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel id="menu-type-label">Loại món</InputLabel>
                      <Select
                        labelId="menu-type-label"
                        id="menu-type"
                        value=""
                        label="Loại món"
                        sx={{ textAlign: "left" }}
                      >
                        {menuTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box>
                      <Stack direction={"row"} spacing={10}>
                        <Button variant="contained">Thêm Mới</Button>
                      </Stack>
                    </Box>
                  </Box>
                )}
                {selectedMenu && (
                  <Box sx={{ p: "16px 10px 16px 10px", textAlign: "center" }}>
                    <Box
                      component="img"
                      alt={selectedMenu.name}
                      src={selectedMenu.path}
                      sx={{
                        width: "200px",
                        height: "200px",
                        pb: "10px",
                        borderRadius: "16px",
                        margin: "0 auto", // Để căn giữa hình ảnh
                      }}
                    />
                    <TextField
                      id="menu-name"
                      label="Tên món"
                      value={selectedMenu.name}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      id="menu-price"
                      label="Giá"
                      value={selectedMenu.price.toLocaleString("vi-VN")}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    />
                    <FormControl
                      fullWidth
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                    >
                      <InputLabel id="menu-type-label">Loại món</InputLabel>
                      <Select
                        labelId="menu-type-label"
                        id="menu-type"
                        value={selectedMenu ? selectedMenu.type : ""}
                        label="Loại món"
                        sx={{ textAlign: "left" }}
                        onChange={(event) =>
                          setSelectedMenu(
                            selectedMenu
                              ? {
                                  ...selectedMenu,
                                  type: event.target.value as string,
                                }
                              : null
                          )
                        }
                      >
                        {menuTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box>
                      <Stack direction={"row"} spacing={10}>
                        <Button variant="contained">Lưu</Button>
                        <Button variant="contained">Sửa</Button>
                      </Stack>
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ManageTable;
