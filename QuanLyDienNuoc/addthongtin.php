	<?php
		include 'connect.php';
		$json = file_get_contents('php://input');
		$obj = json_decode($json,true);

		$username = $obj["username"];
		$idphong = $obj["idphong"];
		$tieude = $obj["tieude"];
		$thangnam = $obj["thangnam"];
		$chisocu = $obj["chisocu"];
		$chisomoi = $obj["chisomoi"];
		$dongiadien = $obj["dongiadien"];
		$gianuoc = $obj["gianuoc"];
		$nguoinop = $obj["nguoithue"];
		

		//lay gia phong
		$sql = "SELECT giaphong FROM phong WHERE idphong ='$idphong'";
		$result = $db->query($sql);
		if (mysqli_num_rows($result) > 0) {
			while($row = $result->fetch_assoc()) {
				$giaphong = $row['giaphong'];
			}
		}

		//Lay iduser
		$sql1 = "SELECT id FROM user WHERE username ='$username'";
		$result1 = $db->query($sql1);
		if (mysqli_num_rows($result1) > 0) {
			while($row = $result1->fetch_assoc()) {
				$iduser = $row['id'];
			}
		}

		$tongtien = ($chisomoi - $chisocu)*$dongiadien + $gianuoc + $giaphong;

		$Sql_Query = "INSERT INTO diennuoc VALUES (null,'$iduser','$idphong', '$tieude','$thangnam', '$chisocu', '$chisomoi', '$dongiadien', '$gianuoc', '$giaphong', '$tongtien', '$nguoinop')";
		if(mysqli_query($db,$Sql_Query)){
			$MSG = 'Insert Done' ;
			$json = json_encode($MSG);
			 echo $json ;	 
		}
		else{	 
		 	$MSGTry = 'Thử lại' ;
			$jsonTry = json_encode($MSGTry);
			 echo $jsonTry ; 
		}
	
 		mysqli_close($db);

 	?>