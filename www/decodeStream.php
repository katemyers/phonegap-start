<?php 
    
    $filename = $_GET["filename"];
    
    if (empty($filename))
    {
        print "ERROR";
        exit;
    }
    
     print decode($filename);
    
    
    
  
    
    
    
    function decode($filename)
    {
        $ext = end(explode(".", $filename));
         
        
        if ($ext == "mp3")
        {
            return $filename;
        }
        else if ($ext == "pls")
        {
            $streamContents = file_get_contents($filename);
            $streamArray =  explode("\n",$streamContents);
        
            foreach ($streamArray as $line)
            {
                if (strpos($line, "File1") === 0)
                {
                    return end(explode("=",$line));
                }
            }
            return "ERROR";
        }
        else if ($ext == "m3u")
        {
            $streamContents = file_get_contents($filename);
            $streamArray =  explode("\n",$streamContents);
        
            foreach ($streamArray as $line)
            {
                if (strpos($line, "http") === 0)
                {
                    $newExt = end(explode(".", $line));
                    if ($newExt == "m3u")
                    {
                        return decode($line);
                    }
                    else
                    {
                        return $line;
                    }
                }
            }
            return "ERROR";
        }
        
        return "ERROR";
    }
    


