<?php
	libxml_disable_entity_loader(true);
	$xm = file_get_contents("php://input");
	$dom = new DOMDocument();
	$dom->loadXML($xm,LIBXML_NOENT | LIBXML_DTDLOAD);
	$login = simplexml_import_dom($dom);
	$user = $login->user;
	$pass = $login->pass;
	echo "<pre> You have logged in as user $user </pre>";
?>
