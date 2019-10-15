<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username =$obj['username'];

	$sql1 = "SELECT id FROM user WHERE username ='$username'";
	$result1 = $db->query($sql1);
	if (mysqli_num_rows($result1) > 0) {
		while($row = $result1->fetch_assoc()) {
			$id = $row['id'];
		}
	}

	$sql = "SELECT `iddn`, `diennuoc`.`iduser`, `phong`.`tenphong`, `tieude`, `thangnam`, `chisocu`, `chisomoi`, `dongiadien`, `gianuoc`, `tongtien` FROM `diennuoc`, `phong` WHERE  `diennuoc`.`iduser` = '$id' AND `phong`.`idphong` = `diennuoc`.`idphong` ORDER BY `thangnam` DESC";
	

	$query = $db->query($sql);

	$arr = array();

	class Flash
	{
		var $iddn;
		var $iduser;
		var $tenphong;
		var $tieude;
		var $thangnam;
		var $chisocu;
		var $chisomoi;
		var $dongiadien;
		var $gianuoc;
		var $tongtien;
		
		function Flash($iddn, $iduser, $tenphong, $tieude, $thangnam, $chisocu, $chisomoi, $dongiadien, $gianuoc, $tongtien)
		{
			$this->iddn = $iddn;
			$this->iduser = $iduser;
			$this->tenphong = $tenphong;
			$this->tieude = $tieude;
			$this->thangnam = $thangnam;
			$this->chisocu = $chisocu;
			$this->chisomoi = $chisomoi;
			$this->dongiadien = $dongiadien;
			$this->gianuoc = $gianuoc;
			$this->tongtien = $tongtien;
		}
	}

	while ($row = mysqli_fetch_array($query)) {
		array_push($arr, new Flash($row["iddn"], $row["iduser"], $row["tenphong"], $row["tieude"],
											$row["thangnam"], $row["chisocu"], $row["chisomoi"]
											, $row["dongiadien"], $row["gianuoc"], $row["tongtien"]));
	}
	echo json_encode($arr);

?>