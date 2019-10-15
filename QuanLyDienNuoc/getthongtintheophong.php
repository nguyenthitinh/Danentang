<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username =$obj['username'];
	$idphong =$obj['idphong'];

	// $username = "a";
	// $idphong = "1";


	$sql1 = "SELECT id FROM user WHERE username ='$username'";
	$result1 = $db->query($sql1);
	if (mysqli_num_rows($result1) > 0) {
		while($row = $result1->fetch_assoc()) {
			$id = $row['id'];
		}
	}

	$sql = "SELECT * FROM diennuoc WHERE idphong = '$idphong' AND iduser = '$id' ORDER BY thangnam DESC ";
	

	$query = $db->query($sql);

	$arr = array();

	class Flash
	{
		var $iddn;
		var $iduser;
		var $tieude;
		var $thangnam;
		var $chisocu;
		var $chisomoi;
		var $dongiadien;
		var $gianuoc;
		var $giaphong;
		var $tongtien;
		var $nguoinop;

		function Flash($iddn, $iduser, $tieude, $thangnam, $chisocu, $chisomoi, $dongiadien, 
						$gianuoc, $giaphong, $tongtien, $nguoinop)
		{
			$this->iddn = $iddn;
			$this->iduser = $iduser;
			$this->tieude = $tieude;
			$this->thangnam = $thangnam;
			$this->chisocu = $chisocu;
			$this->chisomoi = $chisomoi;
			$this->dongiadien = $dongiadien;
			$this->gianuoc = $gianuoc;
			$this->giaphong = $giaphong;
			$this->tongtien = $tongtien;
			$this->nguoinop = $nguoinop;
		}
	}
	

		while ($row = mysqli_fetch_array($query)) {
			array_push($arr, new Flash($row["iddn"], $row["iduser"], $row["tieude"],
												$row["thangnam"], $row["chisocu"], $row["chisomoi"]
												, $row["dongiadien"], $row["gianuoc"], $row["giaphong"], 
												$row["tongtien"], $row["nguoinop"]));
		}
		echo json_encode($arr);
	
	

?>