<?php 
	include 'connect.php';
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);

	$username = $obj['username'];

	$sql1 = "SELECT id FROM user WHERE username ='$username'";
	$result1 = $db->query($sql1);
	if (mysqli_num_rows($result1) > 0) {
		while($row = $result1->fetch_assoc()) {
			$id = $row['id'];
		}
	}

	$sql = "SELECT * FROM phong WHERE  iduser = '$id'";
	
	$query = $db->query($sql);

	$arr = array();

	class Phong
	{
		var $idphong;
		var $iduser;
		var $tennguoithue;
		var $tenphong;
		var $giaphong;
		
		function Phong($idphong, $iduser, $tennguoithue, $tenphong, $giaphong)
		{
			$this->idphong = $idphong;
			$this->iduser = $iduser;
			$this->tennguoithue = $tennguoithue;
			$this->tenphong = $tenphong;
			$this->giaphong = $giaphong;
		}
	}

	while ($row = mysqli_fetch_array($query)) {
		array_push($arr, new Phong($row["idphong"], $row["iduser"], $row["tennguoithue"],
											$row["tenphong"], $row["giaphong"]));
	}
	echo json_encode($arr);

?>